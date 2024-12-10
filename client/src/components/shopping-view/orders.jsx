// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Button } from '../ui/button'
// import { CardContent } from '../ui/card'
// import { CardTitle } from '../ui/card'
// import { CardHeader } from '../ui/card'
// import { Card } from '../ui/card'
// import { Dialog } from '../ui/dialog'
// import { TableHead } from '../ui/table'
// import { TableCell } from '../ui/table'
// import { TableBody } from '../ui/table'
// import { TableRow } from '../ui/table'
// import { TableHeader } from '../ui/table'
// import { Table } from '../ui/table'
// import ShoppingOrderDetailsView from "./order-details";


// function ShoppindOrders() {
//     const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const { orderList } = useSelector((state) => state.shopOrder);



//     useEffect(() => {
//         dispatch(getAllOrdersByUserId(user?.id));
//       }, [dispatch]);


//       console.log(orderList, "orderList");
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     Order History
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Order ID</TableHead>
//                             <TableHead>Order Date</TableHead>
//                             <TableHead>Order Status</TableHead>
//                             <TableHead>Order Price</TableHead>
//                             <TableHead> <span className="sr-only">Details</span></TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell>1234567</TableCell>
//                             <TableCell>21/11/2024</TableCell>
//                             <TableCell>IN Process</TableCell>
//                             <TableCell>$1000</TableCell>
//                             <Dialog open={openDetailsDialog} onOpenChange={ setOpenDetailsDialog} >
//                             <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
//                                 <ShoppingOrderDetailsView />
//                             </Dialog>

                            
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </CardContent>
//         </Card>
        
//     )
// }

// export default ShoppindOrders


import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;