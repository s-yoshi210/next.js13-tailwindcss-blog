import React from "react";
import Image from "next/image";
import { getDetailArticle } from "@/blogAPI";
import DeleteButton from "@/app/components/DeleteButton";

const Article = async ({ params }: { params: { id: string } }) => {
  const detailArticle = await getDetailArticle(params.id);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Image src="https://picsum.photos/800" alt="" width={1280} height={300} />
      <h1 className="text-4xl text-center mb-10 mt-10">
        {detailArticle.title}
      </h1>
      <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content}</p>
      </div>
      <div>
        <DeleteButton id={detailArticle.id} />
      </div>
    </div>
  );
};

export default Article;
