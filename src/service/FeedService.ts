import { Service } from "typedi";
import { FeedRepository } from "../repository/FeedRepository";
import { MemberRepository } from "../repository/MemberRepository";
import { ICreateFeed } from "../types/feed/FeedType";

@Service()
export class FeedService {
  constructor(
    private feedRepository: typeof FeedRepository,
    private memberRepository: typeof MemberRepository
  ) {}

  async createFeed(data: ICreateFeed) {
    try {
      const user = await this.memberRepository.findById(data.user_id);
      const feed = await this.feedRepository.create({
        user_id: user?.id,
        title: data.title,
        description: data.description,
        imgs: data.imgs,
      });

      return feed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
