package com.springboot.backend.david.usersapp.users_backend.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;


public abstract class SimpleGrantedAuthorityJsonCreator {
    
    @JsonCreator
    public SimpleGrantedAuthorityJsonCreator (@JsonProperty("authority") String role){}
}
