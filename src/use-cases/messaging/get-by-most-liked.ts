import { makeGetMostLikedPostUseCase } from "use-cases/factories/likes/make-get-by-most-liked-use-case.ts";
import { sendEmail } from "utils/send-email.ts";

export async function sendDailyTopPostsEmail() {
  const useCase = makeGetMostLikedPostUseCase();
  const result = await useCase.execute();

  const postsHtml = result.posts
    .map((post, i) => `<p>${i + 1}. ${post.title} - ${post.content}</p>`)
    .join("");

  await sendEmail({
    to: "esther.freixo@injunior.com.br",
    subject: "Top 5 de Hoje!",
    message: "Veja os posts mais curtidos do dia!",
    html: `<h1>Top 5!</h1>${postsHtml}`,
  });
}
