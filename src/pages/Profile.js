import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    monthlyBudget: '2000',
    currency: 'USD',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          {/* <div className="profile-avatar">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="avatar-image"
            />
            <button className="change-avatar-btn">Change Photo</button>
          </div> */}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="monthlyBudget">Monthly Budget</label>
                <input
                  type="number"
                  id="monthlyBudget"
                  name="monthlyBudget"
                  value={editedProfile.monthlyBudget}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Preferred Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={editedProfile.currency}
                  onChange={handleChange}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div className="profile-actions">
                <button type="submit" className="save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{profile.name}</p>
              </div>

              <div className="info-group">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>

              <div className="info-group">
                <label>Phone Number</label>
                <p>{profile.phone}</p>
              </div>

              <div className="info-group">
                <label>Monthly Budget</label>
                <p>{profile.currency} {profile.monthlyBudget}</p>
              </div>

              <div className="info-group">
                <label>Preferred Currency</label>
                <p>{profile.currency}</p>
              </div>

              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 