'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Profile() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState<any>(null);
  const [openBarters, setOpenBarters] = useState<any[]>([]);


  useEffect(() => {
    console.log("Fetching user with ID:", userId);
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users/get-user-by-id', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);


  useEffect(() => {
    const fetchOpenBarters = async () => {
      if (!userId) return;

      try {
        const res = await fetch('http://localhost:8080/api/trades/get-open-user-trades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        setOpenBarters(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOpenBarters();
  }, [userId]);
  
  useEffect(() => {
    console.log("User data:", user);
    console.log("Open barters:", openBarters);
  }, [user, openBarters]);  

  return (
    <div className="pb-20">
      <h1 className="p-4 text-2xl font-bold">Profile Page</h1>
      <div className="profile-card">
          <div className="name-chip-cont">
            <div className="name-cont">
              <h2 className="profileName">
                {user ? user.type === "business" ? user.company_name : user.first_name + " " + user.last_name : "Loading..."}
              </h2>
            </div>
            <div className="chip-cont">
              <p className="prof-chip">
                {user?.location}
              </p>
              <p>
                {user?.type === "business" ? "BUSINESS" : "INDIVIDUAL"}
              </p>
            </div>
          </div>
          <div className="cred-rating-cont">
            <div className="cred-cont">
              <h2 className="profilecreds">
                {user?.credits}
              </h2>
            </div>
            <div className="rating">
              {(() => {
                const total = user?.rating_sum ?? 0;
                const jobs = user?.jobs_num ?? 0;

                const avg = jobs > 0 ? total / jobs : 0;

                return (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = avg >= star;
                      const half = avg >= star - 0.5 && avg < star;

                      return (
                        <span key={star}>
                          {filled ? "★" : half ? "☆" : "☆"}
                        </span>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        <div className="open-barters">
          <h2 className="openBartersTitle">Open Barters</h2>
          {
            openBarters.length > 0 ? (
              openBarters.map((barter) => (
                <div key={barter.id} className="barter-card">
                  <p>offers</p>
                  //TODO: put images (both offers and requests) in a scrollable horizontal container?
                  {barter.offers.map((offer: any) => (
                    <div className="offer">
                      <p>{offer.name}</p>
                      <p>{offer.description}</p>
                      <img src={`/uploads/${offer.image_url}`} alt={offer.name} className="offer-image" />
                    </div>
                  ))}
                  <p>requests</p>
                  {barter.requests.map((request: any) => (
                    <div className="request">
                      <p>{request.name}</p>
                      <p>{request.description}</p>
                      <img src={`/uploads/${request.image_url}`} alt={request.name} className="request-image" />
                    </div>
                  ))}
                  {/* TODO: button to offer page */}
                  <button>offer</button>
                </div>
              ))
            ) : <h2>no open barters</h2>
          }
        </div>
      </div>
    </div>
  );
}
