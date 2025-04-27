import { checks, type Check, type InsertCheck } from "@shared/schema";

// Interface for check storage operations
export interface IStorage {
  getAllChecks(): Promise<Check[]>;
  getCheck(id: number): Promise<Check | undefined>;
  createCheck(check: InsertCheck): Promise<Check>;
  updateCheck(id: number, check: InsertCheck): Promise<Check | undefined>;
  deleteCheck(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private checks: Map<number, Check>;
  private currentId: number;

  constructor() {
    this.checks = new Map();
    this.currentId = 1;
  }

  async getAllChecks(): Promise<Check[]> {
    return Array.from(this.checks.values()).sort((a, b) => {
      // Sort by creation date in descending order (most recent first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getCheck(id: number): Promise<Check | undefined> {
    return this.checks.get(id);
  }

  async createCheck(insertCheck: InsertCheck): Promise<Check> {
    const id = this.currentId++;
    const now = new Date();
    const check: Check = { 
      ...insertCheck, 
      id, 
      createdAt: now 
    };
    this.checks.set(id, check);
    return check;
  }

  async updateCheck(id: number, insertCheck: InsertCheck): Promise<Check | undefined> {
    const existingCheck = this.checks.get(id);
    if (!existingCheck) {
      return undefined;
    }

    const updatedCheck: Check = { 
      ...existingCheck, 
      ...insertCheck,
      id 
    };
    this.checks.set(id, updatedCheck);
    return updatedCheck;
  }

  async deleteCheck(id: number): Promise<boolean> {
    return this.checks.delete(id);
  }
}

export const storage = new MemStorage();
