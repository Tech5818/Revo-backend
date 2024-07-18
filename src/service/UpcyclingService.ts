import { Service } from "typedi";
import { UpcyclingRepository } from "../repository/UpcyclingRepository";
import { MemberRepository } from "../repository/MemberRepository";
import { ICreatePost } from "../types/upcycling/UpcyclingType";

@Service()
export class UpcyclingService {
  constructor(
    private upcyclingRepository: typeof UpcyclingRepository,
    private memberRepository: typeof MemberRepository
  ) {}

  async createPost(data: ICreatePost) {
    try {
      const user = await this.memberRepository.findById(data.user_id);

      if (!user) return false;

      const post = await this.upcyclingRepository.create(data);

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const post = await this.upcyclingRepository.findById(id);

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByUserId(user_id: string) {
    try {
      const posts = await this.upcyclingRepository.find({ user_id });

      return posts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const posts = await this.upcyclingRepository.find();

      return posts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: string) {
    try {
      const delete_one = await this.upcyclingRepository.deleteOne({ _id: id });

      return delete_one;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
