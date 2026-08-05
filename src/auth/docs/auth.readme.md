## Login API Flow:
    User Login  (If Logged In Successfully)
        |
    Get Data From Sign Up Table
        |
    On the Bases of [ user_id ] Get its Role form UserRoleEntity
        |
    On the Bases of [ user_id ] Get its Permission form UserPermissionEntity return an [1,2,3] of permissions
        |
    Get Permissions Details form PermissionEntity Table on the Basic of Ids array
        |
    Send Filtered Response Back to Client


``
  Response Format:
    {
        "id": 4,
        "name": "waqas",
        "email": "waqas1@example.com",
        "is_active": true,
        "user_role": [],
        "permission":[]
    }

``



## SignUp API Flow:    