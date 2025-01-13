package com.springboot.backend.david.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.backend.david.usersapp.users_backend.entities.User;
import com.springboot.backend.david.usersapp.users_backend.models.UserRequest;

import io.micrometer.common.lang.NonNull;

public interface UserService {

    List<User> findAll();

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(@NonNull Long id);

    User save(User user);

    Optional<User> update(UserRequest user, Long id);

    void deleteById(Long id);
}
