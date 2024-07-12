import { Service } from "typedi";
import { MemberRepository } from "../repository/MemberRepository";
import { ILoginMember } from "../types/member/MemberType";

@Service()
export class MemberService {
  constructor(private memberRepository: typeof MemberRepository) {}

  async createMember(user: ILoginMember) {
    try {
      const create_user = await this.memberRepository.create(user);

      return create_user;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async findById(id: string) {
    try {
      const user = await this.memberRepository.findById(id);

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByName(name: string) {
    try {
      const users = await this.memberRepository.find({ name });

      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByKakaoId(kakao_id: string) {
    try {
      const user = await this.memberRepository.findOne({ kakao_id });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
