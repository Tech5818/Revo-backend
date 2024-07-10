import { Service } from "typedi";
import { MemberRepository } from "../repository/MemberRepository";

@Service()
export class MemberService {
  constructor(private memberRepository: typeof MemberRepository) {}

  async loginUser(user: { name: string; img: string }) {
    try {
      const create_user = this.memberRepository.create(user);
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
