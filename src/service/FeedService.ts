import { Service } from "typedi";
import { FeedRepository } from "../repository/FeedRepository";
import { MemberRepository } from "../repository/MemberRepository";
import { ICreateFeed } from "../types/feed/FeedType";

@Service()
export class FeedService {
  constructor(private feedRepository: typeof FeedRepository, private memberRepository: typeof MemberRepository) {}

  async createFeed(data: ICreateFeed) {
    try {
      const user = await this.memberRepository.findById(data.user_id);
      const feed = await this.feedRepository.create({
        user_id: user?.id,
        title: data.title,
        description: data.description,
        img: data.img,
      });

      return feed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const feeds = await this.feedRepository.find();

      return feeds;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const feed = await this.feedRepository.findById(id);

      return feed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByUserId(user_id: string) {
    try {
      const feeds = await this.feedRepository.find({ user_id });

      return feeds;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: string) {
    try {
      const delete_one = await this.feedRepository.deleteOne({ _id: id });

      return delete_one;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
