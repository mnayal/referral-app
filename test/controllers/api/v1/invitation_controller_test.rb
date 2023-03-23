require 'test_helper'
require 'api_controller_test'

# TEST PLAN
# "create"
#   "returns 201 and creates invitation against current user"
#   "returns 422 if email is empty in request"

# "index"
#   "only return invitations for current user"

class InvitationControllerTest < ApiControllerTest
  def setup
    super
    @user = User.create(email: 'user+one@testemail.com', password: 'password123')
    @another_user = User.create(email: 'user+two@testemail.com', password: 'password123')
    sign_in @user
  end

  test 'returns 201 and creates invitation against current user' do
    make_create_request({ email: 'invitation+one@testemail.com' })
    assert_create_success
    assert_equal @user.id, @created.invited_by_user_id
  end

  test 'returns 422 if email is empty in request' do
    make_create_request({ email: '' })
    assert_response_unprocessable_entity
  end

  test 'only return invitations for current user' do
    make_create_request({ email: 'invitation+one@testemail.com' })
    assert_create_success
    assert_equal 1, Invitation.count

    sign_in @another_user
    make_create_request({ email: 'invitation+one@testemail.com' })
    assert_create_success
    assert_equal 2, Invitation.count

    make_index_request
    assert_response_ok
    assert_equal 1, parsed_response_ids.count
    assert_includes parsed_response_ids, @created.id
  end

  protected

  def parsed_response_ids
    parsed_response['results'].map { |el| el['id'] }
  end

  def make_create_request(form)
    post '/api/v1/invitation', xhr: true, params: form, as: :json
  end

  def assert_create_success
    assert_response_created
    @created = Invitation.find parsed_response['id']
  end

  def make_index_request
    get api_v1_invitation_index_path, xhr: true, params: {}
  end
end
