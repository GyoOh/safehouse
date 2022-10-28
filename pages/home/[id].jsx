import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "/firebase";
import Detail from "../../components/Home/Detail";
import Navbar from "../../components/Home/NavBar";
import { CenterContainer } from "../../styles/styledComps";
import Image from "../../components/D3Components/Image/ImageComp.jsx";
import Button from "../../components/D3Components/Button/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Ammenities from "../../components/D3Components/NewListings/Ammenities";
import Info from "../../components/D3Components/NewListings/Info";
import Description from "../../components/D3Components/NewListings/Description";
import Rules from "../../components/D3Components/NewListings/Rules";

const DetailPage = () => {
  const [state, setState] = useState([
    {
      homeType: "",
      description: "",

      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
      postalCode: "",

      guests: 0,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      kitchen: 0,
      parking: 0,

      washer: "yes",
      dryer: "yes",
      petsAllowed: "yes",
      smokingAllowed: "yes",

      wifi: "yes",
      tv: "yes",
      airConditioning: "yes",
      heating: "yes",

      image: "",
    },
  ]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const getHome = async () => {
      const docRef = doc(db, "homes", id);
      const home = await getDoc(docRef);
      if (home) {
        setState(home.data());
      }
      return getHome();
    };
  }, []);

  console.log(state);
  return (
    <div>
      <Image src="/home_room.jpg" width="2000px" height="1300px" />
      <div className="flex flex-col items-left justify-left ml-5 pt-10">
        <Info />
        <Description />
        <Ammenities />
        <Rules />
      </div>

      <CenterContainer>
        <div className="m-10">
          <Button
            txt="Contact Host"
            fontSize="16px"
            endIcon={<ArrowForwardIcon />}
            onBtnClick={() => r.push("/chat")}
          />
        </div>
      </CenterContainer>
      <Navbar />
    </div>
  );
};
export default DetailPage;
