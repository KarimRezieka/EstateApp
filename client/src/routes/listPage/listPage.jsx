import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();
  // Ensure you're accessing the correct property
  const posts = data.postResponse._data;
  const list = posts.data; // Correctly accessing the posts array

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                list.map((post) => <Card key={post.id} item={post} />)
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Map items={list} /> {/* Passing list to Map */}
        
      </div>
    </div>
  );
}

export default ListPage;
