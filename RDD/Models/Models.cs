    public class Employee
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } // Store hashed password, not plain text
        public string Department { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
