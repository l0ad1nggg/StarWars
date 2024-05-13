import Image from "next/image";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image src="https://media4.giphy.com/media/1AeeeJHKByB2J6n3yS/giphy.gif?cid=6c09b952a5927g6qofqmgtbnqsgni10t65oks7yuayq1aup8&ep=v1_gifs_search&rid=giphy.gif" alt="Your Gif" layout="fill" objectFit="cover" style={{ zIndex: -1 }}/>
    </div>
  );
}

export default Home;