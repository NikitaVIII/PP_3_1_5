const urlUser = "/api/user";

getCurrentUser();
function getCurrentUser() {
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
