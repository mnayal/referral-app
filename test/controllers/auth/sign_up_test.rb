require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @form = {
      email: 'test@testemail.com',
      password: 'Password@123!!'
    }
  end

  test 'sign up works with email, password and password_confirmation' do
    make_request
    assert_response_ok
  end

  test 'sign up requires :email' do
    @form[:email] = nil
    make_request
    assert_response_unprocessable_entity
    assert_includes parsed_response['errors']['email'], "can't be blank"
  end

  test 'sign up requires :password' do
    @form[:password] = nil
    make_request
    assert_response_unprocessable_entity
    assert_includes parsed_response['errors']['password'], "can't be blank"
  end

  private

  def make_request
    post '/auth', params: @form, as: :json
  end

  def assert_response_ok
    assert_equal 200, response.status
  end

  def assert_response_unprocessable_entity
    assert_equal 422, response.status
  end

  def parsed_response
    JSON.parse response.body
  end
end
