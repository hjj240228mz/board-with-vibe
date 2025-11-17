package com.example.board.domain.post;

import com.example.board.domain.user.User;
import com.example.board.domain.user.UserRepository;
import com.example.board.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<PostListResponse> getPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> postPage = postRepository.findAllByOrderByCreatedAtDesc(pageable);
        Page<PostListResponse> responsePage = postPage.map(PostListResponse::from);
        return PageResponse.from(responsePage);
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        return PostResponse.from(post);
    }

    @Transactional
    public void incrementViewCount(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        post.incrementViewCount();
    }

    @Transactional
    public PostResponse createPost(PostRequest request, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(author)
                .build();

        Post savedPost = postRepository.save(post);
        return PostResponse.from(savedPost);
    }

    @Transactional
    public PostResponse updatePost(Long id, PostRequest request, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        if (!post.isAuthor(username)) {
            throw new IllegalArgumentException("You can only edit your own posts");
        }

        post.update(request.getTitle(), request.getContent());
        return PostResponse.from(post);
    }

    @Transactional
    public void deletePost(Long id, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        if (!post.isAuthor(username)) {
            throw new IllegalArgumentException("You can only delete your own posts");
        }

        postRepository.delete(post);
    }
}
