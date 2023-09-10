import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./src/context";

const url = 'https://api.unsplash.com/search/photos?client_id=yGq2oEp_yu7RT40fs85L6ZZP7A1qJcw3JBgA4fhlgt8'



const Gallery = () => {
  const {searchTerm} = useGlobalContext()
  const response = useQuery({
    queryKey: ['images',searchTerm],
    queryFn: async() => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  if(response.isLoading) {
    return(
      <section className="image-container">
        <h4>loading...</h4>
      </section>
    );
  }

  if(response.isError) {
    return(
      <section className="image-container">
        <h4>there was an error...</h4>
      </section>
    );
  }
  const results = response.data.results;
  if(results.length < 1) {
    return(
      <section className="image-container">
        <h4>No RESULTS FOUND...</h4>
      </section>
    );
  }
  return <section className="image-container">
    {results.map((item) => {
      const url = item?.urls?.regular;
      return (
        <img src={url} key={item.id} alt={item.alt_description} className="img" >

      </img>
      )
    })}
  </section>
  
}

export default Gallery;