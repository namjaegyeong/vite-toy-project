import React, { useState, useEffect } from 'react';
import { EstateFetchResponse, EstateDetail } from './interfaces';
import axios from 'axios';

const API_URL = 'YOUR_API_URL_HERE';

const EstateDetailComponent: React.FC = () => {
  const [estateDetail, setEstateDetail] = useState<EstateDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstateDetail = async () => {
      try {
        const response = await axios.get<EstateFetchResponse>(`${API_URL}/api/v1/public/estate/data/1`);
        setEstateDetail(response.data.estate);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch estate details.');
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => 
    {
      fetchEstateDetail();
    },
    1000);
  }, []);

  console.log(estateDetail);

  if (loading) return <p>Loading estate details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!estateDetail) return <p>No estate details available.</p>;

  return (
    <div>
      <h2>Estate Summary</h2>
      <p>ID: {estateDetail.summary.id}</p>
      <p>Case Number: {estateDetail.summary.caseNumber}</p>
      <p>Court: {estateDetail.summary.court}</p>
      <p>Address: {estateDetail.summary.address}</p>
      <p>Appraisal Value: {estateDetail.summary.appraisalValue}</p>
      <p>Type: {estateDetail.summary.type}</p>
      <p>Coordinates: ({estateDetail.summary.coordinateX}, {estateDetail.summary.coordinateY})</p>
      <p>Standard Date: {estateDetail.summary.standardDate}</p>
      <div>
        <h3>Photos:</h3>
        {estateDetail.summary.photos.length > 0 ? (
          estateDetail.summary.photos.map((photoUrl, index) => (
            <img key={index} src={photoUrl} alt={`Estate Photo ${index + 1}`} style={{ width: '200px', margin: '5px' }} />
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
      <h2>Bid Details</h2>
      <p>Appraisal Value: {estateDetail.bid.appraisalValue}</p>
      <p>Minimum Sell Value: {estateDetail.bid.minimumSellValue}</p>
      <p>Dropped Count: {estateDetail.bid.droppedCount}</p>
      <h2>Note</h2>
      <p>{estateDetail.note}</p>
    </div>
  );
};

export default EstateDetailComponent;