// RecruitmentList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListRecruitmentResponse } from './interfaces/recruitments';

const API_URL = 'YOUR_API_URL_HERE';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';

const RecruitmentListComponent: React.FC = () => {
  const [data, setData] = useState<ListRecruitmentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecruitmentData = async () => {
      try {
        const response = await axios.get<ListRecruitmentResponse>(
          `${API_URL}/api/v1/user/recruitments/list`, // Replace with your API endpoint
          {
            headers: {
              Authorization: ACCESS_TOKEN, // Replace with your token
            },
          }
        );
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitmentData();
  }, []);

  if (loading) return <div>Loading recruitment list...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>Recruitment List</h1>
      <ul>
        {data.list.map((recruitment) => (
          <li key={recruitment.recruitmentId}>
            <p>ID: {recruitment.recruitmentId}</p>
            <p>Applicants Count: {recruitment.applicantsCount}</p>
            <p>Offering Price: {recruitment.offeringPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruitmentListComponent;