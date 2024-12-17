import axios from 'axios';
import { useState } from 'react';
import { SSRdetails } from '../Model/Interface';

import { CiFilter } from "react-icons/ci";

import moment from 'moment';
import "../Style/AnalyzeSSR.scss";
const host = 'localhost:3001';

interface AthletesSSRecordsData {
  [athleteName: string]: SSRdetails[];
}

const AnalyzeSSR = () => {
  const [AthletesSSRecordsData, setAthletesSSRecordsData] = useState<AthletesSSRecordsData>({});

  const [showNormal, setShowNormal] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const getSSRecordsNormal = () => {
    setShowNormal(true);
    setShowDetails(false);
    axios.get(`http://${host}/api/getSSRecords?recordType=Normal`)
      .then(response => {
        setAthletesSSRecordsData(response.data);
        console.log(AthletesSSRecordsData.athleteName);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getSSRecordsDetails = () => {
    setShowNormal(false);
    setShowDetails(true);
    axios.get(`http://${host}/api/getSSRecords?recordType=Details`)
      .then(response => {
        setAthletesSSRecordsData(response.data);
        console.log(AthletesSSRecordsData.athleteName);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const thElements = document.querySelectorAll('th[data-sort]');

  thElements.forEach((th) => {
    th.addEventListener('click', () => {
      const sortKey = th.getAttribute('data-sort') || '';
      handleSort(sortKey);
    });
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }

    const sortedRecords = Object.entries(AthletesSSRecordsData).map(([athleteName, records]) => {
      if (key === 'athleteName') {
        return [athleteName, records];
      } else {
        return [
          // athleteName,
          records.sort((a, b) => {
            const aValue = a[key as keyof SSRdetails];
            const bValue = b[key as keyof SSRdetails];

            if (aValue === undefined || bValue === undefined) {
              return 0;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
              if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : 1;
              } else {
                return aValue > bValue ? -1 : 1;
              }
            } else if (typeof aValue === 'string' && typeof bValue === 'string') {
              const aValueLower = aValue.toLowerCase();
              const bValueLower = bValue.toLowerCase();

              if (sortOrder === 'asc') {
                return aValueLower.localeCompare(bValueLower);
              } else {
                return bValueLower.localeCompare(aValueLower);
              }
            } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
              if (sortOrder === 'asc') {
                return aValue ? 1 : -1;
              } else {
                return aValue ? -1 : 1;
              }
            } else if (aValue instanceof Date && bValue instanceof Date) {
              if (sortOrder === 'asc') {
                return aValue.getTime() < bValue.getTime() ? -1 : 1;
              } else {
                return aValue.getTime() > bValue.getTime() ? -1 : 1;
              }

            } else {
              throw new Error(`Invalid value type for sort key ${sortKey}`);
            }
          }),
        ];
      }
    });

    // setAthletesSSRecordsData(
    //   sortedRecords.reduce((acc: { [key: string]: SSRdetails[] }, [athleteName, records]) => {
    //     acc[athleteName] = records;
    //     return acc;
    //   }, {})
    // );

  };

  return (
    <div className='main'>
      <button onClick={getSSRecordsNormal}>Request Normal SSRecords</button>
      <button onClick={getSSRecordsDetails}>Request Details SSRecords</button>
      <h1 className='title'>SSR</h1>
      <div className='container'>
        <table className="table" >
          <thead className='table-head'>
            <tr className='table-tr'>
              {/* Date sorting cannot work now */}
              <th className='table-th'>
                <label>Date<button onClick={() => handleSort('date')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>Athlete</label>
              </th>
              <th className='table-th'>
                <label>Time<button onClick={() => handleSort('time')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>Missed Cone<button onClick={() => handleSort('missedCone')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>Kicked Cone<button onClick={() => handleSort('kickedCone')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>DQ<button onClick={() => handleSort('DQ')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>End Line<button onClick={() => handleSort('endLine')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>SSResult<button onClick={() => handleSort('SSResult')} className="sort-button"><CiFilter /></button></label>
              </th>
              <th className='table-th'>
                <label>Notes<button onClick={() => handleSort('notes')} className="sort-button"><CiFilter /></button></label>
              </th>
            </tr>
          </thead>
          {showNormal && (
            <tbody className='table-body'>
              {Object.entries(AthletesSSRecordsData).map(([athleteName, records]) => (
                records.map((SSRecords, recordIndex) => (
                  <tr key={`${athleteName}-${recordIndex}`}>
                    <td className='SSR-td'>{moment(SSRecords.date).format('YYYY-MM-DD')}</td>
                    <td className='SSR-td'>{athleteName}</td>
                    <td className='SSR-td'>{SSRecords.time}</td>
                    <td className='SSR-td'>{SSRecords.missedCone}</td>
                    <td className='SSR-td'>{SSRecords.kickedCone}</td>
                    <td className='SSR-td'>{SSRecords.DQ.toString()}</td>
                    <td className='SSR-td'>{SSRecords.endLine.toString()}</td>
                    <td className='SSR-td'>{SSRecords.SSResult}</td>
                    <td className='SSR-td'>{SSRecords.notes}</td>
                  </tr>
                ))
              ))}
            </tbody>
          )}

          {showDetails && (
            <tbody className='table-body'>
              {Object.entries(AthletesSSRecordsData).map(([athleteName, records]) => (
                records.map((SSRecords, recordIndex) => (
                  <tr key={`${athleteName}-${recordIndex}`}>
                    <td className='SSR-td'>{moment(SSRecords.date).format('YYYY-MM-DD')}</td>
                    <td className='SSR-td'>{athleteName}</td>
                    <td className='SSR-td'>{SSRecords.time}</td>
                    <td className='SSR-td'>{SSRecords.missedCone}</td>
                    <td className='SSR-td'>{SSRecords.kickedCone}</td>
                    <td style={{ color: SSRecords.DQ ? 'red' : 'black' }}>
                      {SSRecords.DQ.toString()}
                    </td>
                    <td className='SSR-td'>{SSRecords.endLine.toString()}</td>
                    <td className='SSR-td'>{SSRecords.SSResult}</td>
                    <td className='SSR-td'>{SSRecords.notes}</td>
                  </tr>
                ))
              ))}
            </tbody>
          )}
        </table>
      </div></div>
  );
}

export default AnalyzeSSR;