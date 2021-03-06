import React, { useCallback, useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Button,
  Row,
  Col,
  List,
  Divider,
  Card,
  Empty,
  Modal,
  Descriptions,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//components
import ApartmentDetail from "./ApartmentDetail";
import ApartmentSummary from "./components/ApartmentSummary";
import ApartmentsMapView from "./ApartmentsMapView";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";

//services
import {
  getAllApartments,
  deleteApartment,
} from "services/apartmentService";
//hooks
import useQueryParams from "../../hooks/useQueryParams";
import UserContext from "../../context/userContext";

//constants
import { CLIENT } from "../../constants/userRoles";

//css
import "./index.scss";

const { confirm } = Modal;
const showTotal = (total) => {
  return total ? `Total ${total} items` : null;
};
const pageSize = 5;

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [apartmentData, setApartmentData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(useQueryParams());
  const loggedInUser = useContext(UserContext);
  const [isLoading, setLoader] = useState(false);
  const [drawerVisible, setDrawerVisibility] = useState(false);
  const fetchApartmentData = useCallback(async (page = 1, params = {}) => {
    setApartmentData();
    setLoader(true);
    try {
      let usersData = await getAllApartments({
        page,
        limit: pageSize,
        ...params,
      });
      setApartmentData(usersData);
      setLoader(false);
    } catch (e) {
      setApartmentData(null);
      setLoader(false);
    }
  }, []);
  const fetchDataFromFilter = (filtersParam) => {
    setSelectedFilter(filtersParam);
  };
  useEffect(() => {
    fetchApartmentData(1, selectedFilter);
  }, [fetchApartmentData, selectedFilter]);

  const editApartment = (record) => {
    setSelectedItem(record);
    setDrawerVisibility(true);
  };

  const onSubmitApartment = async (id) => {
    fetchApartmentData(1, selectedFilter);
    setDrawerVisibility(false);
  };
  const createApartment = () => {
    setSelectedItem(null);
    setDrawerVisibility(true);
  };
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this Listing?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        removeApartment(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const removeApartment = async (item) => {
    setLoader(true);
    try {
      await deleteApartment(item.id);
      fetchApartmentData(1, selectedFilter);
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };
  return (
    <div className="dashbaordContainer">
      <Header
        title="Apartments"
        left={
          <Filters
            selectedFilter={selectedFilter}
            fetchDataFromFilter={fetchDataFromFilter}
          />
        }
        right={
          loggedInUser.role !== CLIENT ? (
            <Button key={2} type="primary" onClick={createApartment}>
              Add Apartment
            </Button>
          ) : null
        }
      />
      {isLoading && <LoadingSpinner />}
      {(!apartmentData || (apartmentData && !apartmentData.apartments.length)) && !isLoading &&
        <div className="apartmentEmpty__Container">
          <Empty description={"No Apartment Found"} />
        </div> }
        {apartmentData && apartmentData.apartments.length && <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <List
              itemLayout="vertical"
              size="large"
              className="apartmentList"
              pagination={{
                showSizeChanger: false,
                showTotal: showTotal,
                onChange: (page) => {
                  fetchApartmentData(page, selectedFilter);
                },
                total: apartmentData.totalCount,
                pageSize,
                current: apartmentData.page,
              }}
              rowKey={"id"}
              dataSource={apartmentData.apartments}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.apartmentName}
                    extra={
                      loggedInUser.role !== CLIENT ? (
                        <span>
                          <Button
                            type="link"
                            onClick={() => editApartment(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="link"
                            onClick={() => showDeleteConfirm(item)}
                          >
                            Delete
                          </Button>
                        </span>
                      ) : null
                    }
                  >
                    <ApartmentSummary apartment={item} />
                    <footer className="apartmentOwnerDetail">
                      <Divider orientation="left" plain>
                        Owner Detail
                      </Divider>
                      <Descriptions>
                        <Descriptions.Item label="Name">
                          {item.owner.firstName} {item.owner.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Posted on">
                          {format(new Date(item.createdAt), "MM/dd/yyyy")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Contact No">
                          {item.owner.phoneNumber}
                        </Descriptions.Item>
                      </Descriptions>
                    </footer>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <div>
              <ApartmentsMapView apartments={apartmentData.apartments} />
            </div>
          </Col>
        </Row>
      }
      <ApartmentDetail
        visible={drawerVisible}
        onSubmitApartment={onSubmitApartment}
        setDrawerVisibility={setDrawerVisibility}
        initialValue={selectedItem}
      />
    </div>
  );
};
export default Dashboard;
