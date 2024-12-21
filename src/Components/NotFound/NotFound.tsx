import notFound from "../../assets/images/404-not-found.png";

export default function NotFound() {
  return (
    <>
      <div className="text-center">
        <img src={notFound} alt="notFound" className="notFoundImg" />
      </div>
    </>
  );
}
