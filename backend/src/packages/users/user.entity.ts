class UserEntity {
    private 'id': number | null;

    private 'email': string | null;

    private 'password': string | null;

    private constructor({
      id,
      email,
      password
    }: {
      id: number | null,
      email: string | null,
      password: string | null
    }) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public static initialize({
      id,
      email,
      password
    }: {
        id: number | null,
        email: string | null,
        password: string | null
    }): UserEntity {
      return new UserEntity({ id, email, password });
    }
}

export { UserEntity };
