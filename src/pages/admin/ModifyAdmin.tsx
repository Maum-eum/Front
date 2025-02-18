import React, { useState, useEffect } from "react";
import Input from "../../components/commons/Input";
import Btn from "../../components/commons/Btn";
import { getAdminDetail, modifyAdmin, deleteAdmin } from "../../api/admin/auth";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin/adminStore";
import DeleteAdminModal from "../../components/admin/DeleteModal";

const ModifyAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [connect, setConnect] = useState<string>(""); 
  const { setNameStore, logout } = useAdminStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  const getAdminInfo = async () => {
    await getAdminDetail(
      (res) => {
        setName(res.data.data.name);
        setConnect(res.data.data.connect);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const modifyAdminInfo = async () => {
    await modifyAdmin(
      {
        name: name,
        connect: connect
      },
      () => {
        setNameStore(name)
        alert("저장되었습니다.")
        navigate(-1);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const deleteAdminInfo = async () => {
    await deleteAdmin(
      () => {
        logout();
        navigate("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "name") {
      setName(value)
    } else {
      setConnect(value)
    }
  }

  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 모바일 환경에서만 보이는 UI */}
      <div className="block md:hidden w-full">
        <div className="w-full h-dvh p-4 flex flex-col items-center min-h-screen bg-base-white px-4 sm:px-6 py-8">
          {/* 입력 폼 */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <label className="block text-item sm:text-2xl font-bold text-black mb-2">이름</label> 
            <Input
              type="text"
              name="name"
              placeholder=""
              value={name}
              onChange={handleDataInput}
            />
            <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">연락처</label> 
            <Input
              type="text"
              name="connect"
              placeholder=""
              value={connect}
              onChange={handleDataInput}
            />
            {showModal && <DeleteAdminModal onConfirm={deleteAdminInfo} onCancel={() => setShowModal(false)} />}
          </div>
          <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
            <Btn text="취소하기" color="white" onClick={() => navigate(-1)} /> 
            <Btn text="변경하기" onClick={modifyAdminInfo} />
            <Btn text="탈퇴하기" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      {/* 데스크탑 환경에서만 보이는 UI 추후 작업할지..?*/}
      <div className="hidden md:block">
        데스크탑 화면입니다!
      </div>
    </div>
  );
};

export default ModifyAdmin;
