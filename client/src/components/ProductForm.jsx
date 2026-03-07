import React, { useState } from 'react';
import { categorizeProduct } from '../services/api';

const ProductForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await categorizeProduct(formData);
      setResult(res.data);
      // Clear form after success
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Product Name</label>
        <input 
          type="text" 
          name="name"
          className="form-input" 
          placeholder="e.g. Bamboo Toothbrush"
          value={formData.name}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="input-group">
        <label>Product Description</label>
        <textarea 
          name="description"
          className="form-input" 
          style={{ height: '100px' }}
          placeholder="Describe the product materials and usage..."
          value={formData.description}
          onChange={handleChange}
          required 
        />
      </div>

      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? 'Analyzing Product...' : 'Analyze & Categorize'}
      </button>

      {result && (
        <div className="result-box">
          <h4 style={{marginBottom: '10px'}}>AI Analysis Result</h4>
          <p><strong>Category:</strong> {result.primaryCategory}</p>
          <p><strong>Sub-Category:</strong> {result.subCategory}</p>
          <div style={{marginTop: '10px'}}>
            <strong>SEO Tags:</strong><br/>
            {result.seoTags?.map((tag, i) => <span key={i} className="tag-badge">{tag}</span>)}
          </div>
          <div style={{marginTop: '10px'}}>
            <strong>Sustainability Filters:</strong><br/>
            {result.sustainabilityFilters?.map((f, i) => <span key={i} className="tag-badge" style={{backgroundColor: '#e8f8f5', color: '#27ae60'}}>{f}</span>)}
          </div>
        </div>
      )}
    </form>
  );
};

export default ProductForm;