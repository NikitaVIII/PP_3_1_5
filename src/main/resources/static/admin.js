const urlAdmin = "/api/admin";
let roleList = [];
const urlUser = "/api/user";
const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');



getAllUsers();


//filling header and user-table
function getCurrentUser(){
    $.getJSON(urlUser, function (user) {
        $("#user-info").append("<span>" + user.username + " with roles: " +
            user.roleSet.map(role => role.roleName).join(' ').replaceAll("ROLE_", "") + "</span>");

        $("#user-table").append("<tr> " +
            "<td>" + user.id  + "</td>" +
            "<td>"+ user.firstName +"</td>" +
            "<td>"+ user.lastName +"</td>" +
            "<td>"+ user.age +"</td>" +
            "<td>"+ user.username +"</td>" +
            "<td>"+ user.roleSet.map(role => role.roleName).join(' ').replaceAll("ROLE_", "") +"</td>" +
            + "</tr>");
    });
}

function getAllUsers() {
    getRoles();
    getCurrentUser();
    $.getJSON(urlAdmin, function (users) {
        let result = "";
        $.each(users, function (key, user) {
            result += "<tr><td>" + user.id + "</td>" +
                "<td>" + user.firstName + "</td>" +
                "<td>" + user.lastName + "</td>" +
                "<td>" + user.age + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.roleSet.map(role => role.roleName).join(' ').replaceAll("ROLE_", "") + "</td>" +

                '<td> <button type="button" class="btn btn-info edit-button"' +
                ' data-id="' + user.id + '"' +
                ' data-bs-toggle="modal"' +
                ' data-bs-target="#editModal">Edit' +
                ' </button></td>' +

                '<td> <button type="button" class="btn btn-danger delete-button"' +
                ' data-id="' + user.id + '"' +
                ' data-bs-toggle="modal"' +
                ' data-bs-target="#deleteModal">Delete' +
                '</button></td>' +
                "</tr>";
        });
        $("#all-users-table").append(result);
    });
}

function getRoles() {
    $.getJSON(urlAdmin + "/roles", function (data) {
        roleList = data;
    });
}

function refreshUsersTable() {
    $("#all-users-table").empty();
    $("#user-table").empty();
    $("#user-info").empty();
    getAllUsers();
}


//edit button
$(document).on("click", '.edit-button', function () {
    $.getJSON(urlAdmin + '/' + $(this).attr('data-id'), function (user) {
        $("#user-id-edit").val(user.id);
        $("#first-name-edit").val(user.firstName);
        $("#last-name-edit").val(user.lastName);
        $("#user-age-edit").val(user.age);
        $("#email-edit").val(user.username);
        $("#roles-edit").empty();
        roleList.map(role => {
            $("#roles-edit").append("<option ' + role.id + ' name='" + role.roleName + "'>" +
                role.roleName.replace('ROLE_', '') + "</option>");
        });
    });
});


//confirming edit
$("#edit-button").on("click", function () {
    let updateUser = {
        id: $("#user-id-edit").val(),
        firstName: $("#first-name-edit").val(),
        lastName: $("#last-name-edit").val(),
        age: $("#user-age-edit").val(),
        username: $("#email-edit").val(),
        password: $("#password-edit").val(),
        roleSet: getEditUserRoles()
    }

    $.ajax({
            url: urlAdmin,
            method: 'PUT',
            headers: {'X-XSRF-TOKEN': csrfToken},
            dataType: 'JSON',
            data: JSON.stringify(updateUser),
            contentType: 'application/json',
            success: function () {
                refreshUsersTable();
            }
        }
    );
});

//delete button
$(document).on("click", '.delete-button', function () {
    $.getJSON(urlAdmin + '/' + $(this).attr('data-id'), function (user) {
        $('#user-id-delete').val(user.id);
        $('#first-name-delete').val(user.firstName);
        $('#last-name-delete').val(user.lastName);
        $('#user-age-delete').val(user.age);
        $('#email-delete').val(user.username);
        $("#roles-delete").empty();
        user.roleSet.map(role => {
            $("#roles-delete").append("<option ' + role.id + ' name='" + role.roleName + "'>" +
                role.roleName.replace('ROLE_', '') + "</option>");
        });
    });
});

//confirming delete
$("#delete-button").on("click", function () {
    $.ajax({
        url: urlAdmin + '/' + $("#user-id-delete").val(),
        method: "DELETE",
        headers: {'X-XSRF-TOKEN': csrfToken},
        success: function () {
            refreshUsersTable();
        }
    })
});


// new user form
$("#new-user").on("click", () => {
    $("#new-user-roles").empty();
    roleList.map(role => {
        $("#new-user-roles").append("<option id='" + role.id + "' name='" + role.roleName + "'>" +
            role.roleName.replace('ROLE_', '') + "</option>");
    });
});

//submitting new user form
$("#new-user-button").on("click", (e) => {
    e.preventDefault();
    let newUser = {
        firstName: $("#new-user-first-name").val(),
        lastName: $("#new-user-last-name").val(),
        age: $("#new-user-age").val(),
        username: $("#new-user-email").val(),
        password: $("#new-user-password").val(),
        roleSet: getNewUserRoles()
    }
    console.log(JSON.stringify(newUser));

    $.ajax({
            url: urlAdmin,
            method: 'POST',
            headers: {'X-XSRF-TOKEN': csrfToken},
            dataType: 'JSON',
            data: JSON.stringify(newUser),
            contentType: 'application/json',
            success: function () {
                refreshUsersTable();
                $("#new-user-form")[0].reset();
            }
        }
    );
});

function getNewUserRoles() {
    let result = [];
    $.each($("select[id='new-user-roles'] option:selected"), function () {
        result.push({
            "id": $(this).attr('id'),
            "roleName": $(this).attr('name')
        });
    });
    return result;
}

function getEditUserRoles() {
    let result = [];
    $.each($("select[id='roles-edit'] option:selected"), function () {
        result.push({
            "id": $(this).attr('id'),
            "roleName": $(this).attr('name')
        });
    });
    return result;
}

