package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;



    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String getAllUsers(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.getRoles());
        model.addAttribute("currentUser", user);
        return "/admin";
    }

    @PostMapping()
    public String createNewUser(@ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String editUser(@PathVariable("id") Long id, @ModelAttribute("user") User user) {
        userService.updateUser(user);
//        User user1 = userService.getUserById(id);
//        System.out.println(user);
//        System.out.println(user1);
        System.out.println("AAAAAAAAAAA");
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }



//    @GetMapping()
//    public  String getAllUsers(Model model) {
//        model.addAttribute("users", userService.getAllUsers());
//        return "/admin/all_users";
//    }
//
//    @GetMapping("/user/{id}")
//    public String getUserInfo(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("roles", userService.getUserById(id).getAuthorities());
//        return "/admin/user_info";
//    }
//
//    @GetMapping("/new")
//    public String getNewUserForm(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("roles", roleService.getRoles());
//        return "/admin/new";
//    }
//
//    @PostMapping("/new")
//    public String createNewUser(@ModelAttribute("user") User user) {
//        userService.save(user);
//        return "redirect:/admin";
//    }
//
//
//    @GetMapping("/user/{id}/edit")
//    public String getEditForm(@PathVariable("id") Long id, Model model) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("roles", roleService.getRoles());
//        return "/admin/edit";
//    }
//
//    @PatchMapping("/user/{id}")
//    public String editUser(@PathVariable("id") Long id, @ModelAttribute("user") User user) {
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/user/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.removeUserById(id);
//        return "redirect:/admin";
//    }
}
