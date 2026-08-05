import { Injectable } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { WritableSignal, signal } from '@angular/core';

const DB_USERS = 'myusersdb';

export interface User {
  id: number;
  name: string;
  active: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[] | undefined> = signal<User[] | undefined>(undefined);
  isDBInitialized: WritableSignal<boolean> = signal<boolean>(false);

  constructor() { }

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );`;

    await this.db.execute(schema);
    console.log('Database initialized');
    this.isDBInitialized.set(true);
    return true;
  }

  getUsers() {
    return this.users();
  }

  //CRUD

  async loadUsers() {
    const result = await this.db.query(`SELECT * FROM users`);
    this.users.set(result.values);
  }

  async addUser(name: string) {
    const sql = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await this.db.execute(sql);
    this.loadUsers();
    return result;
  }

  async updateUserById(id: string, active: number) {
    const sql = `UPDATE users SET active = ${active} WHERE id = ${id}`;
    const result = await this.db.execute(sql);
    this.loadUsers();
    return result;
  }

  async deleteUserById(id: string) {
    const sql = `DELETE FROM users WHERE id = ${id}`;
    const result = await this.db.execute(sql);
    this.loadUsers();
    return result;
  }

  async clearUsersTable() {
    await this.db.execute(`DELETE FROM users`);
    this.loadUsers();
  }
}
