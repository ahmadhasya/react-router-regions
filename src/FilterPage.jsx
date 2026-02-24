import { useEffect, useState } from "react";
import regions from "./indonesia_regions.json";

export default function FilterPage() {
  const [regionsData, setRegionsData] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const fetchData = async () => {
    setRegionsData(regions);
  };

  useEffect(() => {
    fetchData();
    const data_province = localStorage.getItem("data_province");
    if (data_province) {
      setSelectedProvince(data_province);
    }
    const data_regency = localStorage.getItem("data_regency");
    if (data_regency) {
      setSelectedRegency(data_regency);
    }
    const data_district = localStorage.getItem("data_district");
    if (data_district) {
      setSelectedDistrict(data_district);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data_province", selectedProvince);
    localStorage.setItem("data_regency", selectedRegency);
    localStorage.setItem("data_district", selectedDistrict);
  }, [selectedProvince, selectedRegency, selectedDistrict]);

  const provinceChanged = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedRegency("");
    setSelectedDistrict("");
  };

  const regencyChanged = (event) => {
    setSelectedRegency(event.target.value);
    setSelectedDistrict("");
  };

  const districtChanged = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleReset = () => {
    setSelectedProvince(1);
    setSelectedRegency("");
    setSelectedDistrict("");
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-[#f9fafc]-200 p-4 h-[100vh]">
        <div className="grid grid cols-1">
          <div className="col-span-1 p-4 font-bold text-[20px]">
            Frontend Assesment
          </div>
        </div>
        <p className="text-[grey] uppercase text-[12px]">Filter Wilayah</p>
        <p className="uppercase mt-4 text-[12px] text-[#9fa7b5]">Provinsi</p>
        <select
          value={selectedProvince}
          onChange={provinceChanged}
          className="p-[10px] w-[80%] mt-2 rounded-[13px] border-[thin] border-[grey]"
        >
          <option value="">--Pilih Provinsi--</option>
          {regionsData?.provinces.map((option) => (
            <option value={option.id} key={JSON.stringify(option)}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="uppercase mt-4 text-[12px] text-[#9fa7b5]">
          Kota/Kabupaten
        </p>
        <select
          value={selectedRegency}
          onChange={regencyChanged}
          className="p-[10px] w-[80%] mt-2 rounded-[13px] border-[thin] border-[grey]"
        >
          <option value="">--Pilih Kota--</option>
          {regionsData?.regencies
            .filter((option) => option.province_id == selectedProvince)
            .map((option) => (
              <option value={option.id} key={JSON.stringify(option)}>
                {option.name}
              </option>
            ))}
        </select>
        <p className="uppercase mt-4 text-[12px] text-[#9fa7b5]">Kecamatan</p>
        <select
          value={selectedDistrict}
          onChange={districtChanged}
          className="p-[10px] w-[80%] mt-2 rounded-[13px] border-[thin] border-[grey]"
        >
          <option value="">--Pilih Kecamatan--</option>
          {selectedRegency &&
            regionsData?.districts
              .filter((option) => option.regency_id == selectedRegency)
              .map((option) => (
                <option value={option.id} key={JSON.stringify(option)}>
                  {option.name}
                </option>
              ))}
        </select>
        <button
          className="w-[80%] cursor-pointer py-2 mt-12 rounded-[13px] border-[thin] border-[grey]"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <main className="col-span-9">
        <div className="breadcrumbs text-[grey] bg-[white] w-full p-6">
          Indonesia&nbsp;
          {selectedProvince && (
            <span className={!selectedRegency ? "text-[#84b6e8]" : ""}>
              &rsaquo;{" "}
              {
                regionsData?.provinces.find(
                  (option) => option.id == selectedProvince,
                )?.name
              }
              &nbsp;
            </span>
          )}
          {selectedRegency && (
            <span className={!selectedDistrict ? "text-[#84b6e8]" : ""}>
              &rsaquo;{" "}
              {
                regionsData?.regencies.find(
                  (option) => option.id == selectedRegency,
                )?.name
              }
              &nbsp;
            </span>
          )}
          {selectedDistrict && (
            <span className="text-[#84b6e8]">
              &rsaquo;{" "}
              {
                regionsData?.districts.find(
                  (option) => option.id == selectedDistrict,
                )?.name
              }
              &nbsp;
            </span>
          )}
        </div>
        <div className="flex items-center w-full h-[80vh]">
          <div className="m-[auto] text-center">
            {selectedProvince && (
              <>
                <p className="uppercase text-[#84b6e8]">Provinsi</p>
                <span className="text-[50px] font-bold">
                  {
                    regionsData?.provinces.find(
                      (option) => option.id == selectedProvince,
                    )?.name
                  }
                </span>
              </>
            )}
            {selectedRegency && (
              <>
                <p className="uppercase text-[#84b6e8] mt-20">
                  Kota / Kabupaten
                </p>
                <span className="text-[50px] font-bold">
                  {
                    regionsData?.regencies.find(
                      (option) => option.id == selectedRegency,
                    )?.name
                  }
                </span>
              </>
            )}
            {selectedDistrict && (
              <>
                <p className="uppercase text-[#84b6e8] mt-20">Kecamatan</p>
                <span className="text-[50px] font-bold">
                  {
                    regionsData?.districts.find(
                      (option) => option.id == selectedDistrict,
                    )?.name
                  }
                </span>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
