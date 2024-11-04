import React from "react";

interface HomeProps {
  content: React.ReactNode;
}

function Home({ content }: HomeProps) {
  return (
    <React.Fragment>
    {content}
    </React.Fragment>
  );
}

export default Home;
