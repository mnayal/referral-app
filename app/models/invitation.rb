# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :invited_by, class_name: 'User', foreign_key: :invited_by_user_id
  validates :email, presence: true
  # TODO: add email validation
end
