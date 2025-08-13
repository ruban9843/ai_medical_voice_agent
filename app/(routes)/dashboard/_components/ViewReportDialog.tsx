import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail, Report } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetail& { report?: Report };
};

function ViewReportDialog({ record }: Props) {
  const report = record.report;

  if (!report) {
    return (
      <Button variant={"link"} size={"sm"} disabled>
        No Report Available
      </Button>
    );
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={"link"} size={"sm"}>
            View Report
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-center text-2xl font-bold">
                Medical AI Voice Agent Report
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4 space-y-4">
                {/* General Info */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    General Info
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p>
                      <strong>Doctor Specialization:</strong>{" "}
                      {record.selectedDoctor?.specialist || "N/A"}
                    </p>
                    <p>
                      <strong>Consult Date:</strong>{" "}
                      {moment(new Date(record.createdOn)).format("DD MMM YYYY, h:mm A")}
                    </p>
                    <p>
                      <strong>Session ID:</strong> {report.sessionId}
                    </p>
                    <p>
                      <strong>Agent:</strong> {report.agent}
                    </p>
                  </div>
                </div>

                {/* Patient Details */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    Patient Details
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p>
                      <strong>User:</strong> {report.user}
                    </p>
                    <p>
                      <strong>Age:</strong>{" "}
                      {report.summary?.match(/aged\s(\d+)/)?.[1] || "N/A"}
                    </p>
                    <p>
                      <strong>Chief Complaint:</strong> {report.chiefComplaint}
                    </p>
                    <p>
                      <strong>Duration:</strong> {report.duration}
                    </p>
                    <p>
                      <strong>Severity:</strong> {report.severity}
                    </p>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    Symptoms
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.symptoms?.length
                      ? report.symptoms.map((symptom, i) => (
                          <li key={i}>{symptom}</li>
                        ))
                      : "No symptoms recorded"}
                  </ul>
                </div>

                {/* Medications */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    Medications Mentioned
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.medicationsMentioned?.length
                      ? report.medicationsMentioned.map((med, i) => (
                          <li key={i}>{med}</li>
                        ))
                      : "No medications mentioned"}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.recommendations?.length
                      ? report.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))
                      : "No recommendations available"}
                  </ul>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">
                    Summary
                  </h3>
                  <p>{report.summary || "No summary available"}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewReportDialog;