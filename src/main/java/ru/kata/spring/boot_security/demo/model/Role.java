package ru.kata.spring.boot_security.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
@JsonSerialize
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "roleName")
    private String roleName;

    @JsonIgnore
    @ManyToMany(mappedBy = "roleSet", cascade = CascadeType.MERGE)
    private List<User> userList = new ArrayList<>();

    public Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public String getAuthority() {
        return roleName;
    }
}
