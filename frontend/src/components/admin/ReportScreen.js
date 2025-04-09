import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport, clearReport } from "../../slices/ReportSlice";
import "./ReportScreen.css";

const ReportScreen = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports/${type}`);
      if (!response.ok) throw new Error("Report not found");
      const data = await response.json();
      console.log("Fetched Report:", data); // Debugging
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h2>Reports</h2>
      <div className="report-buttons">
        <button className="report-button" onClick={() => fetchReport("daily")}>
          Daily Report
        </button>
        <button className="report-button" onClick={() => fetchReport("monthly")}>
          Monthly Report
        </button>
        <button className="report-button" onClick={() => fetchReport("yearly")}>
          Yearly Report
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {report && (
        <div className="report-data">
          <h3>Report Data:</h3>
          <p><strong>Report Type:</strong> {report.report}</p>
          <p><strong>Total Orders:</strong> {report.totalOrders}</p>
          <p><strong>Total Sales:</strong> ₹:{report.totalSales}</p>
        </div>
      )}

      {!report && !loading && (
        <div className="no-report">report data available</div>
      )}
    </div>
  );
};

export default ReportScreen;
