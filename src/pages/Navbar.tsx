import React, {useState,useEffect} from "react";
import logo from "../assets/newLogo.png";
import truCv from "../assets/truCV2.png";
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import {useOkto,getAccount} from "@okto_web3/react-sdk"
import {
  MdCancel,
  MdClose,
  MdContentCopy,
} from "react-icons/md";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";



interface LinkItem {
  path: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  links: LinkItem[];
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlerLogout: () => void;
  currentPath: string;
}

// interface UserLoginData {
//   email: string;
//   name: string;
//   picture: string;
//   sub: string; // Google user ID
// }

// interface User {
//   total: number;
//   tokens: Token[];
// }

// interface Token {
//   token_name: string;
//   quantity: string;
//   amount_in_inr: string;
//   token_image: string;
//   token_address: string;
//   network_name: string;
// }




const Navbar:React.FC = () => {
  const [isActive, setActive] = useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [auth, setAuth] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [networkName, setNetworkName] = useState<string>();
  const [showText, setShowText] = useState(false);
  
  const oktoClient = useOkto();
  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
console.log("currentPath",currentPath);



  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const fetchUserPortfolio = async () => {
    try {
      const accounts= await getAccount(oktoClient);
      console.log("accounts",accounts)
      if(accounts?.length>0)
      {
        console.log("accounts",accounts)
        const acc= accounts.find((accs)=>accs.networkName==="POLYGON");
        setAddress(acc?.address);
        setNetworkName(acc?.networkName);
        setOpenWalletInfo(true);
      }
      
    } catch (error) {
      toast.error("something went wrong...");
      console.log("error while fetching user details...", error);
    }
  };


  //    useEffect(() => {
  //   if (oktoClient.isLoggedIn() && !currentPath.includes("/new-cv")) {
  //     console.log("logged in");
  //     navigate("/");
  //     return;
  //   }

  //   // If not authenticated with Okto, check for stored Google token
  //   const storedToken = localStorage.getItem("googleIdToken");
  //   if (storedToken) {
  //     console.log("storedToken", storedToken);
  //     handleAuthenticate(storedToken);
  //   }
    
  // }, [loginModel]);


  //const handleAuthenticate = async (idToken: string) => {
  //   try {
  //     const user = await oktoClient.loginUsingOAuth({
  //       idToken: idToken,
  //       provider: "google",
  //     } , (session: any) => {
  //       // Store the session info securely
  //       console.log("session", session);
  //       localStorage.setItem("okto_session", JSON.stringify(session));
  //     });
  //     console.log("Authenticated with Okto:", user);
  //     const userData:UserLoginData = jwtDecode(idToken);
  //     console.log("userData",userData);
  //     localStorage.setItem("email",userData.email);
  //     localStorage.setItem("userName",userData.name);
  //     localStorage.setItem("userImage",userData.picture);
  //     //console.log("userData",userData);
  //     setLoginModel(false);
  //     setLoading(false);
  //     //navigate("/");
  //   } catch (error) {
  //     console.error("Authentication failed:", error);
  //     setLoading(false);

  //     // Remove invalid token from storage
  //     localStorage.removeItem("googleIdToken");
  //   }
  // };

  // Handles successful Google login
  // 1. Stores the ID token in localStorage
  // 2. Initiates Okto authentication


  // const handleGoogleLogin = async (credentialResponse: any) => {
  //   setLoading(true);
  //   const idToken = credentialResponse.credential || "";
  //   console.log("idtoken",idToken);
  //   if (idToken) {
  //     localStorage.setItem("googleIdToken", idToken);
  //     handleAuthenticate(idToken);
  //   }
  // };

 
  const copyAddress = async () => {
    try {
      if (address) await navigator.clipboard.writeText(address);
      toast.success("address copied");
    } catch (error) {
      toast.error("Please refresh the page and try again..");
    }
  };


  const handlerLogout = () => {
    try {
            googleLogout();    // Perform Google OAuth logout and remove stored token
            oktoClient.sessionClear();  
            localStorage.removeItem("googleIdToken");
            localStorage.removeItem("email");
            localStorage.removeItem("userName");
            localStorage.removeItem("userImage");
            localStorage.removeItem("tokenExpiry");
            navigate("/");
            return { result: "Logout success" };
        } catch (error) {
            console.error("Logout failed:", error);
            return { result: "Logout failed" };
        }
  };

  const handlerActive = (linkName: string): void => {
    setActive(linkName);
  };
  // const hidePopup = () => {
  //   setLoginModel(false);
  // };
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create Your CV",
      path: "/create-cv",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    }
  ];


  // useEffect(() => {
  //   const hasSeenPopup = localStorage.getItem('hasSeenPopup');
  //   if (!hasSeenPopup) {
  //     setShowText(true);
  //     localStorage.setItem('hasSeenPopup', 'true');
  //   }
    
  // }, []);

  useEffect(()=>{
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if(tokenExpiry){
      const expiryTime = Number(tokenExpiry);
      const currentTime = Date.now() / 1000;
      if(expiryTime < currentTime){
        toast.error("Your session has expired. Please login again.");
        handlerLogout();
      }
    }
  },[])


  return (
    <div className="flex justify-between items-center sm:px-3 w-full border-b-2 border-gray-200" data-aos="fade-right">
      <img src={logo} alt="Logo" className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 " />
      <div className="flex gap-2 justify-between items-center">
        <div className=" space-x-4 hidden lg:block">
          {links?.map((link, i) =>
            link.name === "Home" ? (
              <Link
                key={i + 1}
                to={link.path}
                onClick={() => handlerActive(link.name)}
                className={`${
                  isActive === link.name ? "text-[#f14419]" : "text-[#03257e]"
                } hover:text-[#f14419] transition duration-200 py-2 text-[22px] font-medium`}
              >
                {link.name}
              </Link>
            ) : (
              localStorage.getItem("googleIdToken") && (
                <Link
                  key={i + 1}
                  to={link.path}
                  onClick={() => handlerActive(link.name)}
                  className={`${
                    currentPath === link.path
                      ? "text-[#f14419]"
                      : "text-[#03257e]"
                  } hover:text-[#f14419] transition duration-200 py-2 text-[22px] font-medium`}
                >
                  {link.name}
                </Link>
              )
            )
          )}
          
        </div>
        {!localStorage.getItem("googleIdToken") ? (
            <div className="hidden lg:flex relative rounded-full p-[2px] bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]">
              <Link
                to="/login"
                className="w-full bg-white py-1 text-[20px] px-8 font-bold rounded-full text-[#03257e] hover:text-[#f14419]"
              >
                Login
              </Link>
            </div>
          ) : (
           <div className="relative hidden lg:flex rounded-full p-[2px] bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]">
              <button
                onClick={handlerLogout}
                className="w-full bg-white py-1 text-[20px] px-8 font-bold rounded-full text-[#03257e] hover:text-[#f14419]"
              >
                Logout
              </button>
            </div>
          )}
        {/* Hamburger Menu */}
        <div className="flex items-center justify-center gap-2 ml-2">
          {oktoClient.isLoggedIn() && (
            <div className="relative">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]">
              <button
                onClick={fetchUserPortfolio}
                className=" w-full bg-white py-1 px-4 text-[12px] sm:text-[20px] font-bold rounded-full text-[#03257e] hover:text-[#f14419]"
              >
                View Wallet
              </button>
            </div>
{showText&&    <div className="relative w-fit mt-2">
  <div className="absolute flex justify-center flex-col items-center w-[200px] shadow p-2 bg-white z-20 rounded-md gap-2">
  <p className="text-[#03257e]">
    Please click on view wallet to setup your wallet before proceeding to{" "}
    <span className="text-[#f14419]">Create CV</span>
  </p>
  <button className="py-1 px-3 bg-[#03257e] text-white rounded-lg" onClick={()=>setShowText(false)}>OK</button>
  </div>
  <div className="absolute left-1/2 top-full translate-x-20 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#f14419] rotate-180 z-20"></div>
</div>}

            </div>
          )}
          {openWalletInfo && (
            <div className="absolute rounded px-6 py-4 flex flex-col justify-start items-start mt-44   mr-10 bg-white z-20 shadow-lg gap-4" data-aso="zoom-in">
              <div className="flex justify-evenly items-center gap-2">
                <p className="p-2 border border-[#006666] rounded-full  bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]"></p>
                <p className="text-lg font-bold text-[#006666]">
                  {address?.slice(0, 6)}...{address?.slice(-5)}
                </p>
                <MdCancel
                  onClick={() => setOpenWalletInfo(false)}
                  className="text-lg text-[#ff7300] cursor-pointer"
                />
              </div>
              {networkName && (
                <div className="flex justify-center items-center gap-4">
                  <LiaNetworkWiredSolid className="text-lg text-[#006666] cursor-pointer" />
                  <p className="text-[#03257e] font-medium">{networkName}</p>
                </div>
              )}
              
              <button
                className="flex justify-center items-center gap-4"
                onClick={copyAddress}
              >
                <MdContentCopy className="text-lg text-[#006666] cursor-pointer" />
                <p className="text-[#03257e] font-medium">Copy Address</p>
              </button>
            </div>
          )}
          <div
            className={`relative flex lg:hidden flex-col items-center justify-center w-8 h-8 cursor-pointer space-y-1.5 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "open" : ""
            }`}
            onClick={toggleSidebar}
          >
            <span
              className={`block w-8 h-1 bg-[#03257e] rounded transition duration-300 ease-in-out ${
                isSidebarOpen ? "transform translate-y-3 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-[#f14419] rounded transition duration-300 ease-in-out ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
                isSidebarOpen ? "transform -translate-y-2 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar
      isOpen={isSidebarOpen}
        links={links}
        setIsSidebarOpen={setIsSidebarOpen}
        handlerLogout={handlerLogout}
        currentPath={currentPath}
      />
      <img src={truCv} alt="trucv-logo" className="w-32 h-16 sm:h-24 sm:w-48 md:w-60 md:h-24"></img>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  links,
  setIsSidebarOpen,
  handlerLogout,
  currentPath
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white text-[#006666] transform transition duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } shadow-lg z-10`}
    >
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-20 w-20" />
        <MdClose className="size-8 cursor-pointer hover:text-[#03257e]" onClick={()=>setIsSidebarOpen(false)}/>
        </div>
        {links?.map((link, i) =>
          link.name === "Home" ? (
            <Link
              key={i + 1}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`${
                currentPath === link.path ? "text-[#f14419]" : "text-[#03257e]"
              } hover:text-[#f14419] transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          ) : (
            localStorage.getItem("googleIdToken") && (
              <Link
                key={i + 1}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`${
                  currentPath === link.path ? "text-[#f14419]" : "text-[#03257e]"
                } hover:text-[#f14419] transition duration-200 py-2`}
              >
                {link.name}
              </Link>
            )
          )
        )}
        {!localStorage.getItem("googleIdToken") ? (
          <Link
            to="/login"
            className="bg-[#03257e] py-2 px-4 rounded-full text-center text-white"
          >
            Login
          </Link>
        ) : (
          <div className="relative rounded-full p-[1px] bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]">
            <button
              onClick={handlerLogout}
              className=" w-full bg-white py-2 px-4 rounded-full text-[#03257e] hover:font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
