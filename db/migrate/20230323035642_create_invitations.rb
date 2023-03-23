class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.references :invited_by_user, null: false, foreign_key: { to_table: :users }
      t.string :email, null: false

      t.timestamps
    end
  end
end
