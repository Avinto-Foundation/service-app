// 1st: COVER SEMANTIC TAGS AS WELL AND SAY HOW IT HELPS IN SEO

import { useEffect, useState } from "react";

// 2nd: COVER REACT FOLDER STRUCTURE (FROM THIS AND USE AVINTO CARRERS-FRONTEND REPO) TO SHOW REAL PROD APP

// 3rd: GAME FOLDER STRUCTURE

// 4TH a simple fragment
// export default function App() {
//   return (
//     <>
//       <h1>Hello</h1>
//       <p>World</p>
//     </>
//   );
// }

// 5TH
// {
//   /* <button onClick={handleLikeClicked} className="like-button">
//         👎 Dislike
//       </button> */
// }

// export default function App() {
//   const [likes, setLikes] = useState(0);
//   const handleLikeClicked = () => {
//     setLikes(likes + 1);
//   };

//   return (
//     <>
//       <p>Global Like: {likes}</p>
//       <LikeButton onLikeClicked={handleLikeClicked} />
//       <LikeButton onLikeClicked={handleLikeClicked} />
//     </>
//   );
// }

// export default function App() {
//   const [likes, setLikes] = useState<number>(0);

//   const handleLikeClicked = () => {
//     setLikes(likes + 1);
//   };

//   return (
//     <>
//       <LikeButton  />
//     </>
//   );

interface Services {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  imageUrl: string;
  price: number;
  distanceMiles: number;
  tags: String[];
}

export default function App() {
  const [services, setServices] = useState<Services[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://localhost:3000/services")
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  //       return res.json();
  //     })
  //     .then((data: Services[]) => {
  //       setServices(data);
  //     })
  //     .catch((error) => {
  //       if (error instanceof Error) setError(error.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/services");

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const services = await response.json();
      setServices(services);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  if (isLoading) {
    return <>Loading.....</>;
  }

  if (error != null)
    return (
      <>
        <h1>Something went wrong: {error}</h1>
      </>
    );

  if (services != null && services.length == 0) {
    return (
      <>
        <h1>No data</h1>
      </>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {services?.map((service) => (
        <div
          key={service.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-40 w-full object-cover"
          />

          <div className="p-4">
            <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {service.tags[0]}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {service.name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{service.rating}</span>
              <span className="text-gray-400">
                ({service.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span>{service.distanceMiles} mi away</span>
              <span className="font-semibold text-gray-900">
                ${service.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// import { useState, useRef } from "react";

// export default function App() {
//   const [seconds, setSeconds] = useState(0);
//   const [running, setRunning] = useState(false);
//   const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

//   function tick(current: number) {
//     const next = current + 1;
//     setSeconds(next);
//     timeoutId.current = setTimeout(() => tick(next), 1000);
//   }

//   function stop() {
//     if (timeoutId.current !== null) {
//       clearTimeout(timeoutId.current);
//       timeoutId.current = null;
//     }
//     setRunning(false);
//   }

//   function start() {
//     if (timeoutId.current !== null) {
//       clearTimeout(timeoutId.current);
//       timeoutId.current = null;
//     }
//     setSeconds(0);
//     setRunning(true);
//     timeoutId.current = setTimeout(() => tick(0), 1000);
//   }

//   function reset() {
//     stop();
//     setSeconds(0);
//   }

//   return (
//     <div className="device">
//       <div className="eyebrow">
//         <span className={`dot ${running ? "live" : ""}`}></span>
//         <span>{running ? "Running" : "Idle"}</span>
//       </div>

//       <div className="readout">{seconds}</div>
//       <div className="unit">seconds elapsed</div>

//       <div className="controls">
//         <button className={running ? "running" : ""} onClick={start}>
//           {running ? "Restart" : "Start"}
//         </button>
//         <button onClick={reset}>Reset</button>
//       </div>

//       <div className="note">
//         Restarting while running cancels the previous run.
//       </div>
//     </div>
//   );
// }
