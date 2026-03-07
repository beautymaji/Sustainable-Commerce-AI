import React from 'react';
import ProductForm from '../components/ProductForm';

const Categorization = () => {
  return (
    <div className="page-container">
      {/* Page Header Section */}
      <div className="page-header">
        <h2>Module 1: Auto-Category & Tags</h2>
        <p>
          Leverage AI to automatically categorize products, generate SEO tags, 
          and identify sustainability filters to reduce manual catalog effort.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="content-card">
        {/* This is the form component we created earlier */}
        <ProductForm />
      </div>
    </div>
  );
};

export default Categorization;