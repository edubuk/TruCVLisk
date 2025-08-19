import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AccessDeniedPage from "./AccessDenied";

const AdminUsersPage = () => {
    const [usersData,setUsersData] = useState<any>([]);
    const [checkAccess,setCheckAccess] = useState<boolean>(false);
    const fetchUserData = async()=>{
        try {
            const response = await fetch("http://localhost:8000/admin/getAllUser",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("googleIdToken")}`
                }
            });
            const data = await response.json();
            if(!data.success)
            {
                return toast.error(data.message);
            }
            console.log("data",data);
            setUsersData(data.data);
            setCheckAccess(true);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        fetchUserData();
    }, []);
  return (
    <>
    {checkAccess ? (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-[#03257e] mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usersData.map((user:any) => (
          <div
            key={user._id}
            className="bg-white border rounded-2xl shadow-md p-5 flex flex-col gap-3"
            style={{ borderColor: "#006666" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#03257e] break-all">
                {user.email}
              </h2>
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-[#f14419] text-white">
                {user.subscriptionPlan}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#006666]">Payment ID:</span>{" "}
              {user.paymentId || "N/A"}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#006666]">Coupon:</span>{" "}
              {user.couponCode || "N/A"}
            </p>

            <div>
              <h3 className="font-semibold text-[#03257e] mb-2">CVs:</h3>
              <div className="flex flex-wrap gap-2">
                {user.nanoIds && user.nanoIds.length > 0 ? (
                  user.nanoIds.map((id:any, idx:any) => (
                    <a
                      key={idx}
                      href={`/cv/${id}`} // replace with actual CV route
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm font-medium rounded-lg shadow-sm transition
                                 bg-[#006666] text-white hover:bg-[#03257e]"
                    >
                      View CV {idx + 1}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">No CVs uploaded</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <AccessDeniedPage />
  )}
</>
  );
};

// Example usage with your given data
// const sampleData = {
//   message: "User Found",
//   data: [
//     {
//       _id: "68934affeeefabde81a557e5",
//       email: "ajeet@edubukeseal.org",
//       subscriptionPlan: "Pro",
//       paymentId: "pay_R2ouGQxZoDGkde",
//       nanoIds: [
//         "Ajeet-Verma-9S6QS93JW1kUgV4k",
//         "Ajeet-Verma-KoRdkYchP28ZuiZ1",
//         "Ajeet-%25-TRHu1mni64vU3va5",
//         "Ajeet-CV-jM5akjIaiN-GDPb-",
//       ],
//       couponCode: "CVPRODIS",
//     },
//     {
//       _id: "689b1ec337a1c083cbeca531",
//       email: "neelupandey5098@gmail.com",
//       subscriptionPlan: "Pro",
//       paymentId: "pay_R4Otsy01UuzelK",
//       nanoIds: ["Neelu-Pandey-LPx4mfTBoCdhv0Fz"],
//       couponCode: "UPLOADDIS",
//     },
//   ],
//   success: true,
// };

export default AdminUsersPage;
