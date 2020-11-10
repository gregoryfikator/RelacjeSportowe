namespace RelacjeSportowe.DataAccess.Dtos
{
    public class UserWithRoleDto : UserDto
    {
        public string Role { get; set; }

        public int RoleId { get; set; }
    }
}
