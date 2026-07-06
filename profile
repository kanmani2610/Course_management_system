{% extends "base.html" %}
{% block title %}My Profile - Course Management System{% endblock %}
{% block content %}

<section class="auth-section">
    <div class="auth-card">
        <h2>My Profile</h2>
        <p class="auth-subtitle">Update your account details</p>

        <form method="POST" action="{{ url_for('profile') }}">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" value="{{ user.name }}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" value="{{ user.email }}" disabled>
            </div>
            <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" placeholder="Leave blank to keep current password">
            </div>
            <button type="submit" class="btn btn-primary btn-full">Save Changes</button>
        </form>
    </div>
</section>

{% endblock %}
