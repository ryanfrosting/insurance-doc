import React from "react";
import { InsuranceCardData } from "../types";
import { ShieldWatermark } from "./ShieldWatermark";
import "./TdTemporarySheet.css";

interface TdTemporarySheetProps {
  data: InsuranceCardData;
  watermarkOpacity?: number;
  showWatermark?: boolean;
  page?: 1 | 2;
}

export const TdTemporarySheet: React.FC<TdTemporarySheetProps> = ({
  data,
  watermarkOpacity = 0.25,
  showWatermark = true,
  page = 1,
}) => {
  const formatExpiryHeader = (dateStr: string) => {
    if (!dateStr) return "February 6, 2026";

    try {
      if (dateStr.includes("-")) {
        const [year, month, day] = dateStr.split("-");
        if (year && month && day) {
          return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        }
      } else {
        const parts = dateStr.trim().split(/\s+/);
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        }
      }
    } catch {
      // Keep the supplied value as a fallback.
    }

    return dateStr;
  };

  const parseDateParts = (dateStr: string) => {
    if (!dateStr) return { y: '', m: '', d: '', formatted: '' };
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return { 
          y: parts[0], 
          m: parts[1], 
          d: parts[2],
          formatted: `${parts[0].slice(-2)} ${parts[1]} ${parts[2]}`
        };
      }
    } else {
      const parts = dateStr.trim().split(/\s+/);
      if (parts.length === 3) {
        return { 
          d: parts[0], 
          m: parts[1], 
          y: parts[2],
          formatted: `${parts[2].slice(-2)} ${parts[1]} ${parts[0]}`
        };
      }
    }
    return { y: dateStr, m: '', d: '', formatted: dateStr };
  };

  const eff = parseDateParts(data.effectiveDate);
  const exp = parseDateParts(data.expiryDate);

  if (page === 2) {
    return (
      <div id="print-sheet-container-p2" className="td-sheet flex flex-col justify-between">
        <div />
        <div className="td-page-number">Page 2 of 2</div>
      </div>
    );
  }

  const CardFront = () => (
    <div className="td-card">
      {showWatermark && <ShieldWatermark opacity={watermarkOpacity} />}

      <div className="td-card-row td-agency-row">
        <div className="td-side-label">
          <span>AGENCY</span>
          <span>AGENCE</span>
        </div>
        <div className="td-card-content td-agency-content">
          {data.broker ? (
            data.broker.split('\n').map((line, idx) => (
              <div key={idx} style={{ lineHeight: '1.2' }}>
                {line}
              </div>
            ))
          ) : (
            <>
              <div style={{ lineHeight: '1.2' }}>TD Insurance Direct Agency Inc.</div>
              <div style={{ lineHeight: '1.2' }}>101 McNabb Street, 2nd Floor</div>
              <div style={{ lineHeight: '1.2' }}>Markham, ON L3R 4H8</div>
              <div style={{ lineHeight: '1.2' }}>1-800-268-8955</div>
            </>
          )}
        </div>
      </div>

      <div className="td-card-row td-insured-row">
        <div className="td-side-label">
          <span>INSURED</span>
          <span>ASSURÉ-E</span>
        </div>
        <div className="td-card-content td-insured-content">
          <div style={{ lineHeight: '1.25' }}>{data.insuredName || 'Michael Kaftan'}</div>
          <div style={{ lineHeight: '1.25' }}>{data.insuredAddress || '314 Grandin Villge'}</div>
          <div style={{ lineHeight: '1.25' }}>{data.insuredCityProvPostal || 'St. Albert AB T8N 2R6'}</div>
        </div>
      </div>

      <div className="td-policy-row">
        <div className="td-policy-left">
          <div className="td-mini-header">
            <span>POLICY No.-No DE POLICE</span>
            <span>Y/A</span>
            <span>M</span>
            <span>D/J</span>
          </div>
          <div className="td-policy-value">
            <strong>{data.policyNumber}</strong>
            <span>{eff.formatted || data.effectiveDate}</span>
          </div>
        </div>

        <div className="td-policy-right">
          <div className="td-mini-header td-date-header">
            <span>
              EFFECTIVE DATE
              <small>PRISE D'EFFET</small>
            </span>
            <span>
              EXPIRY DATE
              <small>EXPIRATION</small>
            </span>
            <span>Y/A</span>
            <span>M</span>
            <span>D/J</span>
          </div>
          <div className="td-policy-value td-expiry">
            <span>{exp.formatted || data.expiryDate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="td-back">
      <div className="td-back-head">
        <div>MOTOR VEHICLE LIABILITY INSURANCE CARD</div>
        <div>CERTIFICAT D'ASSURANCE-AUTOMOBILE RESPONSABILITÉ</div>
        <strong>CANADA INTER-PROVINCE</strong>
        <div>APPLICABLE WITHIN CANADA AND THE UNITED STATES OF AMERICA</div>
        <div>EN VIGUEUR AU CANADA ET AUX ÉTATS-UNIS D'AMÉRIQUE</div>
      </div>

      <div className="td-back-copy">
        <p>
          This certificate is subject to the terms and conditions of the
          insurer&apos;s standard automobile policy. This certifies that the
          party named herein is insured against liability for bodily injury
          and property damage by reason of operation of the motor vehicle
          described herein, in an amount not less than statutory minimum
          requirements in any area of Canada.
        </p>

        <p>
          <strong>WARNING</strong> - Any person who issues or produces a card
          to show that there is in force a policy of insurance as indicated
          herein that is in fact not in force is liable to a heavy fine and/or
          imprisonment and his license may be suspended. This card should be
          carried in the insured vehicle for production as proof of insurance
          when demanded by police.
        </p>

        <p className="td-french">
          Le présent certificat est assujetti aux dispositions et conditions
          de la police d&apos;assurance automobile standard de l&apos;assureur.
          Ce certificat atteste que la partie nommée aux présentes est assurée
          contre la responsabilité pour blessures corporelles et dommages
          matériels par suite de l&apos;utilisation du véhicule automobile
          décrit aux présentes, pour un montant non moindre que le minimum
          prescrit par la loi dans n&apos;importe quelle région du Canada.
        </p>

        <p className="td-french">
          <strong>AVERTISSEMENT</strong> - Toute personne qui délivre ou
          produit une carte pour faire preuve qu&apos;une police d&apos;assurance
          est en vigueur tel qu&apos;indiqué aux présentes alors qu&apos;elle ne
          l&apos;est pas, est passible d&apos;une forte amende et/ou d&apos;un
          emprisonnement et son permis peut être suspendu.
        </p>
      </div>
    </div>
  );

  return (
    <div id="print-sheet-container" className="td-sheet">
      <header className="td-header">
        <div className="td-brand">
          <img 
            alt="Toronto-Dominion Bank - Wikipedia" 
            id="dimg_LbmkasbnEtCj0PEPtvzn8Aw_27_sheet" 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCuug9R4EhZdxrVE3Zd9khLazEVHCK6T8FFnQIYOYeg&s=10" 
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            crossOrigin="anonymous"
          />
          <div>
            <div className="td-brand-name">TD Insurance</div>
            <div className="td-brand-sub">Meloche Monnex</div>
          </div>
        </div>

        <div className="td-agency-address">
          <strong>TD Insurance Direct Agency Inc.</strong>
          <br />
          101 McNabb Street
          <br />
          2nd Floor
          <br />
          Markham, ON L3R 4H8
          <br />
          T: 1-800-268-8955
          <br />
          F: 1-888-662-8024
          <br />
          www.tdinsurance.com/affinity
        </div>
      </header>

      <div className="td-title">
        <h1>Your Temporary Automobile Liability Insurance Card</h1>
        <h2>
          Votre certificat temporaire d&apos;assurance responsabilité automobile
        </h2>
        <p>Valid until/valide jusqu&apos;au {formatExpiryHeader(data.expiryDate)}</p>
      </div>

      <div className="td-grid">
        {[0, 1, 2].map((i) => (
          <div className="td-pair" key={i}>
            <div className="td-left">
              <div className="td-insurer">
                <strong>INSURER / ASSUREUR:</strong> {data.companyName}
                <br />
                <span>{data.companyAddress}, {data.companyCityProvPostal}</span>
              </div>

              <CardFront />

              <div className="td-vehicle">
                {data.vehicleYearMake} <span>{data.vehicleVin}.</span>
              </div>
            </div>

            <div className="td-right">
              <CardBack />
            </div>
          </div>
        ))}
      </div>

      <div className="td-page-number">Page 1 of 2</div>
    </div>
  );
};
