"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import FileSaver from "file-saver";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralCode(code);
    const link = `https://studio.luxima.id/ref/${code}`;
    setReferralLink(link);
  };

  const generateQRCode = useCallback(async (link: string) => {
    try {
      const dataURL = await QRCode.toDataURL(link);
      setQRCodeDataURL(dataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, []);

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      FileSaver.saveAs(qrCodeDataURL, "luxima-studio-referral-qr.png");
    }
  };

  useEffect(() => {
    if (referralLink) {
      generateQRCode(referralLink);
    }
  }, [referralLink, generateQRCode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Refer a Friend</CardTitle>
          <CardDescription>
            Share your unique referral code with friends and earn rewards when
            they book a session!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateReferralCode} className="w-full mb-4">
            Generate Referral Code
          </Button>
          {referralCode && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Your Referral Code:</h3>
                <p className="text-2xl font-bold text-primary">
                  {referralCode}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Your Referral Link:</h3>
                <p className="text-sm break-all">{referralLink}</p>
              </div>
              {qrCodeDataURL && (
                <div>
                  <h3 className="font-semibold mb-1">QR Code:</h3>
                  <Image
                    src={qrCodeDataURL || "/placeholder.svg"}
                    width={200}
                    height={200}
                    alt="Referral QR Code"
                    className="mx-auto mb-2"
                  />
                  <Button
                    onClick={downloadQRCode}
                    variant="outline"
                    className="w-full"
                  >
                    Download QR Code
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReferralSystem;
