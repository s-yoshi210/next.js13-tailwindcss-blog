import { notFound } from "next/navigation";
import { Article } from "./types";

export const getAllArticles = async (): Promise<Article[]> => {
  // JSON形式の文字列
  const res = await fetch("http://localhost:3002/posts", { cache: "no-store" }); // SSR

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1.5秒待つ

  // Responseオブジェクトのbody部分が読み取られ、JSON形式の文字列がJavaScriptオブジェクト(JSON)に変換される（デシリアライズ）
  const articles = await res.json();
  return articles;
};

export const getDetailArticle = async (id: string): Promise<Article> => {
  // JSON形式の文字列
  const res = await fetch(`http://localhost:3002/posts/${id}`, {
    next: { revalidate: 60 },
  }); // ISR(60秒間に一回キャッシュを無効にする)

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1.5秒待つ

  // Responseオブジェクトのbody部分が読み取られ、JSON形式の文字列がJavaScriptオブジェクト(JSON)に変換される（デシリアライズ）
  const articles = await res.json();
  return articles;
};

export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  const currentDatatime = new Date().toISOString();

  // JSON形式の文字列
  const res = await fetch(`http://localhost:3002/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, content, currentDatatime }),
  }); // ISR(60秒間に一回キャッシュを無効にする)

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1.5秒待つ

  // Responseオブジェクトのbody部分が読み取られ、JSON形式の文字列がJavaScriptオブジェクト(JSON)に変換される（デシリアライズ）
  const newArticles = await res.json();
  return newArticles;
};

export const deleteArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3002/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1.5秒待つ

  // Responseオブジェクトのbody部分が読み取られ、JSON形式の文字列がJavaScriptオブジェクト(JSON)に変換される（デシリアライズ）
  const deleteArticles = await res.json();
  return deleteArticles;
};
