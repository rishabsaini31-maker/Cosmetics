'use client';

import { useState } from 'react';

export interface FilterState {
  category: string;
  fragranceFamily: string[];
  maxPrice: number;
  pricePreset: string | null;
  volume: string | null;
  expression: string;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [familiesOpen, setFamiliesOpen] = useState(true);

  const categories = [
    { name: 'All Offerings', count: totalResults || 28 },
    { name: 'Perfumes & Extraits', count: 12 },
    { name: 'Skincare & Balms', count: 8 },
    { name: 'Botanical Body Care', count: 5 },
    { name: 'Discovery Sets', count: 3 },
  ];

  const fragranceFamilies = [
    { name: 'Woody & Santal', count: 14 },
    { name: 'Floral Jasmine & Rose', count: 11 },
    { name: 'Amber Oriental', count: 9 },
    { name: 'Fresh Botanical Citrus', count: 6 },
    { name: 'Spicy Vintage Oud', count: 7 },
  ];

  const volumes = ['15ml Attar', '30ml Travel', '50ml Flacon', '100ml Ritual'];

  const expressions = ['Unisex / Transcendent', 'Feminine Leaning', 'Masculine Leaning'];

  const handleCategorySelect = (catName: string) => {
    onFilterChange({
      ...filters,
      category: catName,
    });
  };

  const handleFamilyToggle = (famName: string) => {
    const current = filters.fragranceFamily;
    const updated = current.includes(famName)
      ? current.filter((item) => item !== famName)
      : [...current, famName];
    onFilterChange({
      ...filters,
      fragranceFamily: updated,
    });
  };

  const handlePriceChange = (val: number) => {
    onFilterChange({
      ...filters,
      maxPrice: val,
      pricePreset: null,
    });
  };

  const handlePricePreset = (preset: string, maxVal: number) => {
    onFilterChange({
      ...filters,
      maxPrice: maxVal,
      pricePreset: preset,
    });
  };

  const handleVolumeSelect = (vol: string) => {
    onFilterChange({
      ...filters,
      volume: filters.volume === vol ? null : vol,
    });
  };

  const handleExpressionSelect = (exp: string) => {
    onFilterChange({
      ...filters,
      expression: exp,
    });
  };

  return (
    <aside className="w-full max-w-xs bg-surface-container-lowest border border-surface-container-high p-space-md shadow-sm select-none">
      {/* Sidebar Header: CURATORIAL REFINEMENT & CLEAR ALL */}
      <div className="bg-surface-container-low p-space-md flex items-center justify-between border-b border-surface-container-high mb-space-lg">
        <h3 className="font-label-caps text-xs uppercase tracking-[0.2em] font-bold text-primary">
          Curatorial Refinement
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary hover:text-primary transition-colors underline font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-space-xl">
        {/* 1. CATEGORIES Accordion */}
        <div className="border-b border-surface-container-high pb-space-md">
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="w-full flex items-center justify-between font-label-caps text-xs uppercase tracking-[0.18em] text-primary font-bold mb-space-sm"
          >
            <span>Categories</span>
            <span className="material-symbols-outlined text-sm text-outline">
              {categoriesOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>

          {categoriesOpen && (
            <div className="space-y-2 pt-1">
              {categories.map((cat) => {
                const isSelected =
                  filters.category === cat.name ||
                  (cat.name === 'All Offerings' && filters.category === 'All');

                return (
                  <label
                    key={cat.name}
                    className="flex items-center justify-between text-xs font-body cursor-pointer text-on-surface hover:text-primary group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="categoryFilter"
                        checked={isSelected}
                        onChange={() => handleCategorySelect(cat.name)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span className={isSelected ? 'font-semibold text-primary' : 'text-on-surface-variant'}>
                        {cat.name}
                      </span>
                    </div>
                    <span className="font-label-caps text-[0.65rem] text-outline">
                      {cat.count}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. FRAGRANCE FAMILY Accordion */}
        <div className="border-b border-surface-container-high pb-space-md">
          <button
            type="button"
            onClick={() => setFamiliesOpen(!familiesOpen)}
            className="w-full flex items-center justify-between font-label-caps text-xs uppercase tracking-[0.18em] text-primary font-bold mb-space-sm"
          >
            <span>Fragrance Family</span>
            <span className="material-symbols-outlined text-sm text-outline">
              {familiesOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>

          {familiesOpen && (
            <div className="space-y-2 pt-1">
              {fragranceFamilies.map((fam) => {
                const isChecked = filters.fragranceFamily.includes(fam.name);
                return (
                  <label
                    key={fam.name}
                    className="flex items-center justify-between text-xs font-body cursor-pointer text-on-surface hover:text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFamilyToggle(fam.name)}
                        className="w-4 h-4 rounded-none accent-primary cursor-pointer"
                      />
                      <span className={isChecked ? 'font-semibold text-primary' : 'text-on-surface-variant'}>
                        {fam.name}
                      </span>
                    </div>
                    <span className="font-label-caps text-[0.65rem] text-outline">
                      ({fam.count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. PRICE CALIBRATION */}
        <div className="border-b border-surface-container-high pb-space-md">
          <div className="flex items-center justify-between font-label-caps text-xs uppercase tracking-[0.18em] font-bold text-primary mb-space-xs">
            <span>Price Calibration</span>
            <span className="text-secondary font-bold text-sm">
              ₹{filters.maxPrice.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={950}
            max={8000}
            step={250}
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary mb-space-xs"
          />

          <div className="flex justify-between font-label-caps text-[0.65rem] text-outline uppercase mb-space-sm">
            <span>₹950</span>
            <span>₹8,000+</span>
          </div>

          {/* Quick Price Preset Buttons */}
          <div className="flex gap-space-xs">
            {[
              { label: '< ₹2,000', maxVal: 2000 },
              { label: '₹2k - ₹4k', maxVal: 4000 },
              { label: '> ₹4,000', maxVal: 8000 },
            ].map((p) => {
              const isSelected = filters.pricePreset === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePricePreset(p.label, p.maxVal)}
                  className={`flex-1 font-label-caps text-[0.6rem] uppercase tracking-wider py-1.5 transition-all border ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant border-surface-container-high hover:border-secondary'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. FLACON VOLUME Pills Grid */}
        <div className="border-b border-surface-container-high pb-space-md">
          <span className="font-label-caps text-xs uppercase tracking-[0.18em] font-bold text-primary block mb-space-sm">
            Flacon Volume
          </span>
          <div className="grid grid-cols-2 gap-space-xs">
            {volumes.map((vol) => {
              const isSelected = filters.volume === vol;
              return (
                <button
                  key={vol}
                  type="button"
                  onClick={() => handleVolumeSelect(vol)}
                  className={`font-label-caps text-[0.65rem] uppercase tracking-wider py-2 text-center transition-all border ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary font-semibold shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant border-surface-container-high hover:border-secondary'
                  }`}
                >
                  {vol}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. EXPRESSION & PRESENCE Radios */}
        <div className="border-b border-surface-container-high pb-space-md">
          <span className="font-label-caps text-xs uppercase tracking-[0.18em] font-bold text-primary block mb-space-sm">
            Expression & Presence
          </span>
          <div className="space-y-2">
            {expressions.map((exp) => {
              const isSelected = filters.expression === exp;
              return (
                <label
                  key={exp}
                  className="flex items-center gap-2 text-xs font-body cursor-pointer text-on-surface hover:text-primary"
                >
                  <input
                    type="radio"
                    name="expressionFilter"
                    checked={isSelected}
                    onChange={() => handleExpressionSelect(exp)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className={isSelected ? 'font-semibold text-primary' : 'text-on-surface-variant'}>
                    {exp}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 6. IN STOCK ONLY Checkbox Bar */}
        <div className="bg-surface-container-low p-space-sm border border-surface-container-high flex items-center justify-between cursor-pointer"
             onClick={() => onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        >
          <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.18em] font-bold text-primary">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
        </div>

        {/* 7. AUTHENTICITY GUARANTEED SEAL */}
        <div className="bg-surface-container-low/70 border border-surface-container-high p-space-md text-center mt-space-lg">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] font-bold text-secondary block mb-1">
            AUTHENTICITY GUARANTEED
          </span>
          <p className="font-body text-[0.7rem] text-on-surface-variant leading-tight">
            Each batch authenticated with physical batch stamp & handwritten seal.
          </p>
        </div>
      </div>
    </aside>
  );
}
