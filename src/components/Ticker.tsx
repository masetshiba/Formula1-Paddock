/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TICKER_ITEMS } from '../constants.ts';
import { fetchLiveTickerUpdates } from '../services/geminiService.ts';
import { fetchUpcomingRaceData } from '../services/raceScheduleService.ts';

type TickerItem = { sym: string; val: string; pts: string };

function formatNextRaceDateLabel(dateText: string) {
  const match = dateText.match(/^([A-Za-z]{3})\s*(\d{1,2})/);
  if (!match) return dateText.toUpperCase();
  return `${match[1].toUpperCase()} ${match[2]}`;
}

function normalizeNextRaceName(country: string) {
  if (country.toLowerCase() === 'canadian') return 'CANADA';
  return country.toUpperCase();
}

export function Ticker({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const defaultItems = theme === 'dark' ? TICKER_ITEMS : [
    { sym: 'WDC', val: 'ANTONELLI ⭐', pts: '72 pts' },
    { sym: 'WCC', val: 'MERCEDES ⭐', pts: '135 pts' },
    { sym: 'NEXT', val: 'CANADA GP', pts: 'JUN 13' },
    { sym: 'WINNER', val: 'ANTONELLI', pts: 'JAPAN' },
    { sym: 'FL', val: 'RUSSELL', pts: '1:28.411' },
    { sym: 'FAST PIT', val: 'MERCEDES', pts: '1.92s' },
    { sym: 'MERC', val: 'DOMINANT', pts: 'FORCE' },
    { sym: 'POWER', val: 'HPP V6', pts: 'E-PERF' },
  ];
  const [items, setItems] = useState<TickerItem[]>(defaultItems);

  useEffect(() => {
    let active = true;

    const applyAccurateNextRace = async (sourceItems: TickerItem[]) => {
      try {
        const raceData = await fetchUpcomingRaceData();
        const nextRaceItem = {
          sym: 'NEXT',
          val: `${normalizeNextRaceName(raceData.nextRace.country)} GP`,
          pts: formatNextRaceDateLabel(raceData.nextRace.date),
        };
        const withoutNext = sourceItems.filter(item => item.sym !== 'NEXT');
        return [nextRaceItem, ...withoutNext];
      } catch {
        return sourceItems;
      }
    };

    const setItemsWithAccurateNext = async (sourceItems: TickerItem[]) => {
      const mergedItems = await applyAccurateNextRace(sourceItems);
      if (active) {
        setItems(mergedItems);
      }
    };

    let initialItems = defaultItems;

    // Check for global live sync data first
    const savedSync = localStorage.getItem('f1_live_sync');
    if (savedSync) {
      try {
        const data = JSON.parse(savedSync);
        let finalItems = data.ticker || defaultItems;
        
        // Add weather if available from OpenF1
        if (data.weather) {
          const w = data.weather;
          const weatherItem = { 
            sym: 'WEATHER', 
            val: `${w.air_temperature}°C`, 
            pts: `${w.humidity}% RH` 
          };
          // Insert at second position or just push
          finalItems = [finalItems[0], weatherItem, ...finalItems.slice(1)];
        }

        if (finalItems && finalItems.length > 0) {
          initialItems = finalItems;
        }
      } catch (e) {
        console.error(e);
      }
    }

    setItemsWithAccurateNext(initialItems);
    
    const getLiveTicker = async () => {
      try {
        const liveItems = await fetchLiveTickerUpdates();
        if (liveItems && liveItems.length > 0) {
          setItemsWithAccurateNext(liveItems);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLiveTicker();
    
    // Poll every 10 minutes for fresh "live" data to preserve quota
    const interval = setInterval(getLiveTicker, 600000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [theme]);

  const displayItems = [...items, ...items]; // Duplicate for infinite scroll

  return (
    <div className="bg-carbon h-10 md:h-11 overflow-hidden flex items-center border-b-2 border-mercedes relative z-50">
      <div className="flex whitespace-nowrap animate-ticker will-change-transform">
        {displayItems.map((it, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="tick px-4 md:px-6 flex items-center gap-1.5 md:gap-2 font-mono text-[10px] md:text-[11px] font-medium tracking-widest text-white/65 uppercase">
              <span className="text-mercedes font-semibold tracking-[0.14em]">{it.sym}</span>
              <span className="text-white font-semibold">{it.val}</span>
              <span className="text-mercedes font-medium">{it.pts}</span>
            </span>
            <span className="text-white/20 px-1 text-[8px] md:text-[9px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
