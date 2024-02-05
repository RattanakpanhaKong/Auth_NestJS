import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'john_doe',
      password: 'password1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'jane_smith',
      password: 'password2',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      username: 'bob_johnson',
      password: 'password3',
    },
  ];

  // async createUser(username: string, password: string): Promise<User>{
    
  // }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }
}
